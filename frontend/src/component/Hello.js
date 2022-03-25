//const Hello = function(){
//<p>Hello</p>
//}
//export default hello;
// import World from "./World";
import styles from "./Hello.module.css";
import { useState } from "react";
import UserName from "./UserName";
export default function Hello(props) {
  console.log(props);
  //    let name="Mike";
  const [name, setName] = useState("Mike");
  const [age, setAge] = useState(props.age);
  const msg = age > 19 ? "성인입니다" : "미성년자입니다.";
  function changeName() {
    setAge(age + 1);
    setName(name === "Mike" ? "Jane" : "Mike");
  }
  function showName() {
    console.log("Mike");
  }
  function showAge(age) {
    console.log(age);
  }
  function showText(txt) {
    console.log(txt);
  }
  return (
    <div>
      <h1>state</h1>
      <h2>
        {name}({age}세): {msg}{" "}
      </h2>
      <UserName name={name} />
      <button onClick={changeName}>이름바꾸기</button>
      <h1
        style={{
          color: "#f00",
          borderRight: "12px solid #000",
          marginBottom: "30px",
          opacity: 1,
        }}
      >
        Hello
      </h1>
      <button onClick={showName}> Show Name</button>
      <button
        onClick={() => {
          showAge(30);
        }}
      >
        {" "}
        Show age
      </button>
      <input
        type="text"
        onChange={(e) => {
          const txt = e.target.value;
          showText(txt);
        }}
      />

      {/* <World></World> */}
      <div className={styles.box}></div>
    </div>
  );
}
