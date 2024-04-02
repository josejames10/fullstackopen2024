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

const Content = ({parts}) =>    
    <>
        <Part part={parts[0]}></Part>
        <Part part={parts[1]}></Part>
        <Part part={parts[2]}></Part>
        <Part part={parts[3]}></Part>
    </>
    
const Part = ({part}) =><div> {part.name}: {part.exercises}</div>

const Total = ({parts}) =>{
        const total = parts.map(e =>e.exercises).reduce((a,b) => a+b)
        console.log("total",total)
        return <b>total of {total} exercises</b>
}

export default Course;