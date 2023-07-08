import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';


function App() {

  const [number, setNumber] = useState(0);
  const klik = () =>{
    setNumber(number + 1);
  };
  
  const [name, setName] = useState('');

  const [tahunLahir, setTahunLahir] = useState('');

  const [usia, setUsia] = useState('')

  const [form, setForm] = useState({
    name: '',
    tahunLahir: '',
    usia: '',
  });

  const handleSubmit = () => {
    // setUsia(2023 - tahunLahir);
    setForm({... form, usia : 2023 - form.tahunLahir});
    console.log(form.usia);
  }

  const handleChange = (e) => {
    // console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.name);
    setForm({...form, [e.target.name] : e.target.value});
  }

  return (
    <div className="App">
      <h1>Counte App</h1>
      <h1>Nilai Counter Saat ini : {number}</h1>
      <Button onClick={klik}>
      Click Me
      </Button>
    <br /><br />
      nama :  <Input type="text" name="name" value={form.name} onChange={e=> handleChange(e)}/> 
    <br /><br />
      Tahun Lahir :  <Input type="number" name="tahunLahir"  value={form.tahunLahir} onChange={e=> handleChange(e)}/> 
    <br /><br />
      <Button onClick={handleSubmit}>Submit</Button>
    <br /><br />
      Usia : {form.usia}
    </div>
    
  );
}

export default App;
