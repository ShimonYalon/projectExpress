import React, { useState, useEffect } from "react";

function Info() {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState([]);
  const [inner, setInner] = useState("");

  function makeButons(path) {
    fetch(`http://localhost:3009/${path}`)
      .then((i) => i.json())
      .then((files) => setFiles(files));
  }

  useEffect(() => {
    makeButons("");
  }, []);

  return (
    <div>
      <div>Shimon great guy</div>
      {files.map((file) => (
        <div>
          <button
            onClick={() => {
              setInfo(file);
              file.type=="folder" && makeButons(file.name)
            }}
          >
            {file.name}
          </button>
          {file.type!=="folder" && <button
            onClick={() => {
              setInner(file.fullname)
            }}
          >
           show
          </button>}
        </div>
      ))}

      <div>
        the info is:{" "}
        {info &&
          Object.entries(info).map(([key, value]) => {
            return (
              <div>
                {key}: {value}
              </div>
            );
          })}
      </div>
      <iframe src={`http://localhost:3009/${inner}`}height="1000" width={1000}/>

      {/* <div>the birth is:{files}</div> */}
    </div>
  );
}
export default Info;
