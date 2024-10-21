import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import styles from "@/styles/UploadImage.module.css"; 
export default function UploadImage() {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file || !name || !price) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error("Upload error: ", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setUrl(downloadURL);

                try {
                    await addDoc(collection(db, "products"), {
                        name: name,
                        price: parseFloat(price),
                        image: downloadURL
                    });
                    alert("Produto salvo com sucesso!");
                    setName("");
                    setPrice("");
                    setFile(null);
                    setProgress(0);
                } catch (error) {
                    console.error("Erro ao salvar no Firestore: ", error);
                }
            }
        );
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Nome do Produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="number"
                placeholder="Preço do Produto"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.inputField}
            />
            <input type="file" onChange={handleFileChange} className={styles.fileInput} />
            <button onClick={handleUpload} className={styles.uploadButton}>Upload Image</button>
            <p className={styles.progressText}>Progresso: {progress}%</p>
            {url && <img src={url} alt="Imagem Enviada" className={styles.imagePreview} />}
        </div>
    );
}
