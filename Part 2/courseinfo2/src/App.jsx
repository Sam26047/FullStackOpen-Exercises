const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {
let sum=0;
return(
  <div>
    {parts.map((part)=>{
      sum+=part.exercises;
      return(<Part key={part.id} part={part}/>)
  })}
  <Total total = {sum}/>
  </div>
  )
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <p><b>Total of {props.total} exercises</b></p>

const Course = ({course})=>{
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }

    ]
  }

  return <Course course={course} />

}

export default App