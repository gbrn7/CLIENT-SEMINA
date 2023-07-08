import {Hello} from './hello'; //is equals with Hello =  hello.hello
import Title from './title';
import Button from './components/Button';
import Table from './components/Table';


function App() {

  // console.log(Hello);
  // const hallo = () => 'hello';
  
  // function Hallo(){
  //   return 'hello'
  // }

  const users = ['Gibran', 'Farhan', 'Deni'];

  const usersObj = [
    {
      _id : 1,
      name: 'riki',
      age : 22,
      status : true
    },
    {
      _id : 2,
      name: 'farhan',
      age : 23,
      status : true
    },
    {
      _id : 3,
      name: 'adi',
      age : 22,
      status : false
    },
  ]

  return (
    <div className="App">

        <Hello/>
        <br />
        <Title name="Muhammad Rayhan Gibran"/>
        <br />
        <Title name="Farhan"/>
        <br />
        <Title />

        <ul>
          {users.map((user, index) => {
            return <li key={index}>{user}</li>
          })}
        </ul>


        <ul>
          {usersObj.map((user, index) => {
            return( 
            <>
                {
                  user.status &&(
                  <li key ={index}>{`Nama ${user.name} usia ${user.age}`}</li>
                  )
                }
            </>
            );
          })}
        </ul>

        <Table users={usersObj}/>

        <Button onClick={() => alert('click save btn')}> 
          Save
        </Button>
    </div>
    
  );
}

export default App;
