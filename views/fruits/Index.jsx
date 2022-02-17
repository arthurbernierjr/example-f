const React = require('react')

class Index extends React.Component {
    render(){
        const fruits = this.props.fruits   
        return (
            <div>
                <h1>This is the Index Page of My Beautiful Collection of Fruit</h1>
                <nav>
                    <a href="/fruits/new">Go to the new page</a>
                </nav>
                <ul>
                {
                    fruits.map((fruit, i) => {
                        return (
                            <li><a href={`/fruits/${i}`}>{fruit.name}</a> is the color of {fruit.color}</li>
                        )
                    })
                }
                </ul> 
            </div>
        )
    }
}


module.exports = Index;