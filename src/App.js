import React from 'react';
import { Link, BrowserRouter as Router,Route} from 'react-router-dom';
const topics = [
  {
    name: 'React Router',
    id: 'react-router',
    description: 'Declarative, component based routing for React',
    resources: [
      {
        name: 'URL Parameters',
        id: 'url-parameters',
        description: "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
        url: 'https://tylermcginnis.com/react-router-url-parameters/'
      },
      {
        name: 'Programmatically navigate',
        id: 'programmatically-navigate',
        description: "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
        url: 'https://tylermcginnis.com/react-router-programmatically-navigate/'
      }
    ]
  },
  {
    name: 'React.js',
    id: 'reactjs',
    description: 'A JavaScript library for building user interfaces',
    resources: [
      {
        name: 'React Lifecycle Events',
        id: 'react-lifecycle',
        description: "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
        url: 'https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/'
      },
      {
        name: 'React AHA Moments',
        id: 'react-aha',
        description: "A collection of 'Aha' moments while learning React.",
        url: 'https://tylermcginnis.com/react-aha-moments/'
      }
    ]
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.',
    resources: [
      {
        name: 'Imperative vs Declarative programming',
        id: 'imperative-declarative',
        description: 'A guide to understanding the difference between Imperative and Declarative programming.',
        url: 'https://tylermcginnis.com/imperative-vs-declarative-programming/'
      },
      {
        name: 'Building User Interfaces with Pure Functions and Function Composition',
        id: 'fn-composition',
        description: 'A guide to building UI with pure functions and function composition in React',
        url: 'https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/'
      }
    ]
  }
]
const Home = ({match})=>{
  return<h5>Home</h5>
}

const Resource = ({match}) =>{
  const resource = topics.find(({id})=>{
    return id===match.params.topicId;
  }).resources.find((item)=>{
    return item.id===match.params.resourceID;
  });  
  return(
    <div>
        <h3>{resource.name}</h3>
        <p>{resource.description}</p>
        <a href={resource.url}>More Info...</a>
    </div>)
}
const Topic = ({match})=>{
  const topic = topics.find((topic)=>{
    return topic.id===match.params.topicId;
  })
  return(<div>
    <h2>{topic.name}</h2>
    <p>{topic.description}</p>
    <ul>{topic.resources.map((resource)=>{
      return(<li key={resource.id}><Link to={`${match.url}/${match.params.topicId}/${resource.id}`}>{resource.id}</Link></li>)
    })}</ul>
    <hr/>
    <Route path = {`${match.path}/:topicId/:resourceID`} component={Resource}/>
  </div>)
}
const Topics = ({match})=>{
  return(
      <div>
        <h4>Topics</h4>
        <ul>
          {topics.map((topic)=>{
            return <li key={topic.id}><Link to={`${match.url}/${topic.id}`}>{topic.name}</Link></li>
          })}
        </ul>
        <hr/>
        <Route path={`${match.path}/:topicId`} component={Topic}/>
        <Route exact path={`${match.path}`} render={()=>(<h3>Please Select topic</h3>)}/>
      </div>        
    )
}
function App() {
  return (
    <Router>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
      </ul>
      <hr/>
      <Route exact path='/' component={Home}/>
      <Route path='/topics' component={Topics}/>
    </Router>
  );
}

export default App;
