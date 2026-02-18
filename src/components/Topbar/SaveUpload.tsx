"use client";

import Ajv, { Schema } from "ajv"
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type UploadedSave = {
  name: string;
  size: number;
  lastModified: number;
};
interface SaveUploadProps {
    uploadSave: (file: File) => void;
}
const SaveUpload: React.FC<SaveUploadProps> = ({ uploadSave }) =>  {

  const [uploadedSave, setUploadedSave] = useState<UploadedSave | null>(null);
  const [invalidJSON, setInvalidJSON] = useState<boolean>();
  const ajv = new Ajv()
  const schema: Schema = {
    type: "object",
    properties: {
      Warframes: { type: "array" },
      Primary: { type: "array" },
      Secondary: { type: "array" },
      Melee: { type: "array" },
      SentinelWeapons: { type: "array" },
      Sentinels: { type: "array" },
      Pets: { type: "array" },
      Kdrives: { type: "array" },
      Necramech: { type: "array" },
      Archwing: { type: "array" },
      ArchMelee: { type: "array" },
      ArchGun: { type: "array" },
      Amp: { type: "array" },
      Nodes: { type: "array" },
      drifterIntrinsics: { type: "array" },
      railjackIntrinsics: { type: "array" },
      starchartExp: { type: "number" },
      starchartExpSp: { type: "number" },
    },
    required: [
      "Warframes",
      "Primary",
      "Secondary",
      "Melee",
      "SentinelWeapons",
      "Sentinels",
      "Pets",
      "Kdrives",
      "Necramech",
      "Archwing",
      "ArchMelee",
      "ArchGun",
      "Amp",
      "Nodes",
      "drifterIntrinsics",
      "railjackIntrinsics",
      "starchartExp",
      "starchartExpSp",
    ],
  }

  const validateJSON = async(file: File) => {
    const validate = ajv.compile(schema)
    const text = await file.text();
    const parsed: unknown = JSON.parse(text);
    if (!validate(parsed)) {
      setInvalidJSON(true);
      return false;
    }
    setInvalidJSON(false);
    return true;
  }
  
  const onDrop = useCallback(async(acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const isValid = await validateJSON(file)
    if(!isValid){
      return;
    }
    uploadSave(file);
    setUploadedSave({
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
    });
  }, [uploadSave]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "application/json": [".json"] },
      multiple: false,
    });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-secondary p-6 rounded-lg cursor-pointer text-center text-primary w-full max-w-lg"
    >
      <input {...getInputProps()} />
      {uploadedSave ? (
        <div>
          <p className="font-semibold">Uploaded Save</p>
          <p>
            <strong>Name:</strong> {uploadedSave.name}
          </p>
          <p>
            <strong>Size:</strong> {(uploadedSave.size / 1024).toFixed(2)} KB
          </p>
          <p>
            <strong>Last Modified:</strong>{" "}
            {new Date(uploadedSave.lastModified).toLocaleString()}
          </p>
          <p className="mt-3 text-secondary text-sm">
            Drag & drop a new file to replace
          </p>
        </div>
      ) : isDragActive ? (
        <p>Drop the JSON save file here...</p>
      ) : (
        <p>Drag & drop a JSON save file here, or click to select one</p>
      )}

      {fileRejections.length > 0 && (
        <p className="text-danger mt-2">Only .json files are allowed</p>
      )}
      {invalidJSON && (
        <p className="text-danger mt-2">Invalid save file</p>
      )}
    </div>
  );
};
export default SaveUpload;