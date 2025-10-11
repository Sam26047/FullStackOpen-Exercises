const Header = (props) => <h2>{props.course}</h2>

const Content = ({parts}) => {
return(
  <div>
    {parts.map((part)=>{
      return(<Part key={part.id} part={part}/>)
  })}
  </div>
  )
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({total}) => <p><b>Total of {total.reduce((accumulator,currentItem)=>{
  console.log(accumulator,currentItem.exercises)
  return(accumulator + currentItem.exercises)
},0)} exercises</b></p>    //0 is the 2nd argument for reduce after the function , which signifies the initial value of the accumulator,if not mentioned becomes first element of array which in this case will be a problem as the first value is an object/dictionary

const Course = ({course})=>{
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total = {course.parts}/>
    </div>
  )
}

export default Course;