const Header = (props) => <h1>{props.course}</h1>

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
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return <Course course={course} />

}

export default App