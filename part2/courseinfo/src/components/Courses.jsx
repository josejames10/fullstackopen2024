

const Course = ({course}) => {
    console.log(course.name)
    
    return (
        <div>

            <Header header={course.name}></Header>
            <Content parts={course.parts}></Content>
        </div>

        )
}

const Header = ({header}) => <h1>{header}</h1>

const Content = ({parts}) =>    
    <>
        <Part part={parts[0]}></Part>
        <Part part={parts[1]}></Part>
        <Part part={parts[2]}></Part>
    </>
    
const Part = ({part}) =><div> {part.name}: {part.exercises}</div>

export default Course;