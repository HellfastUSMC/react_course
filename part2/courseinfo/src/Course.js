const Summary = ({course}) => {
    const ex_sum = course.parts.reduce((a, b) => a + b.exercises, 0)
    return (
      <p>Total of {ex_sum} exercises</p>
    )
  }
  
  const Parts = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part => <Parts name={part.name} exercises={part.exercises} key={part.id} />)}
        <Summary course={course} />
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Course = ({courses}) => {
    return (
      <>
        {courses.map(course => <div key={course.id}><Header course={course}/><Content course={course}/></div>)}
      </>
    )
  }

export {Course}