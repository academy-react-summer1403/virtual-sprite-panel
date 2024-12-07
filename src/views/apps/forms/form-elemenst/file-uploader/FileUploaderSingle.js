// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud } from "react-feather";
import instance from "../../../../../core/services/interceptor";
import { selectImg } from "../../../../../core/services/api/courses/CreateCourseStep2.api";

const FileUploaderSingle = ({ setImg }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.slice(0, 1).map((file) => Object.assign(file)));
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("هیچ فایلی برای آپلود وجود ندارد!");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      const CourseId = "96d64900-ddb3-ef11-b6ee-fd09e32c9077";
      formData.append("CourseId", CourseId);
      formData.append("Image", file); // نام "file" باید با API شما همخوانی داشته باشد.
    });


    try {
      const response = await selectImg(formData);
      setImg(files[0])
      console.log("نتیجه آپلود:", response);
    } catch (error) {
      console.error("خطا در آپلود فایل:", error);
      alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
    }
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };
  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          name="imgSel"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };
  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  return (
    <Card>
      <CardBody>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            <DownloadCloud size={64} />
            <h5>فایل را اینجا رها کنید یا دکمه آپلود را بفشارید</h5>
          </div>
        </div>
        {files.length ? (
          <Fragment>
            <ListGroup className="my-2">{fileList}</ListGroup>
            <div className="d-flex justify-content-end">
              <Button
                className="me-1"
                color="danger"
                outline
                onClick={handleRemoveAllFiles}
              >
                حذف
              </Button>
              <Button color="primary" onClick={handleUpload}>
                آپلود عکس
              </Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FileUploaderSingle;
