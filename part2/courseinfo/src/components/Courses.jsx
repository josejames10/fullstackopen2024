const Course = ({course}) => {
    console.log(course.parts)    
    return (
        <div>
            <Header header={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
        )
}

const Header = ({header}) => <h1>{header}</h1>

const Content = ({parts}) =>{
    return <>
            {parts.map(e=><Part key={e.id}part={e}></Part>)}
           </>
    }
    
const Part = ({part}) =><div> {part.name}: {part.exercises}</div>

const Total = ({parts}) =>{
    const total = parts.map(e =>e.exercises).reduce((a,b) => a+b)
    console.log("total",total)
    return <b>total of {total} exercises</b>
}

export default Course;