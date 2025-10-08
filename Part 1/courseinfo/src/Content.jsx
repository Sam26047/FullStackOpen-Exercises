function Part(props){
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

function Content(props){
    const parts = props.parts;
    return(
        <>
            {
                parts.map((part,index)=>(
                    <Part key={index} name={part.name} exercises={part.exercises} />
                ))
            }

        </>
    )
}

export default Content;