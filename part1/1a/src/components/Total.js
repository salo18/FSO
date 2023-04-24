export default function Total(props) {
console.log(props.parts)
  const sum = props.parts[0].exercises
  return (
    <>
     <p>Number of exercises {sum}</p>
    </>
  );
}