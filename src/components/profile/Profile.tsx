import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./profile.module.scss";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const hiddenInputRef: any = useRef(null);

  const [uploadedImages, setUploadedImages] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (incomingFiles) => {
      if (incomingFiles.length > 10) {
        alert("Максимальное количество картинок которые можете загрузить: 10");
        return;
      }
      getImagesFromInput(incomingFiles);
    },
  });

  const getImagesFromInput = (fileArray: any[]) => {
    fileArray.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setUploadedImages((prev: any): any => [
          ...prev,
          {
            imageId: index,
            imageSrc: e.target.result,
            imageName: file.name,
            imageSize: 55,
            imagePrice: 55,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onButtonClick = () => {
    hiddenInputRef.current.click();
  };

  return (
    <section className={styles.popup__content}>
      <BottomSheet
        open={true}
        snapPoints={({ minHeight }) => [minHeight + 48, screen.height]}
      >
        <div
          {...getRootProps({ className: "dropzone" })}
          className={clsx(
            styles.uploader,
            isDragActive && styles.uploader__active
          )}
        >
          <div>Перетащите сюда файлы</div>
          <p>Или</p>
          <button onClick={onButtonClick}>Выбрать с устройства</button>
          <input
            type="file"
            onChange={(e: any) =>
              getImagesFromInput(Array.from(e.target.files))
            }
            ref={hiddenInputRef}
            multiple
            accept="image/jpg, image/jpeg, image/png, image/webp"
          />
        </div>
        {/* {uploadedImages?.map((image: any) => (
          <img src={image.imageSrc} />
        ))} */}
      </BottomSheet>
    </section>
  );
};

export default Profile;
