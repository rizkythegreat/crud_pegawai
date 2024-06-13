import './App.css';
import { Container } from '@mui/material';
import DataTable from './components/Table';

function App() {
  return (
    <div className='App'>
      <h1>Data Pegawai</h1>
      <Container maxWidth="lg">
        <DataTable />
      </Container>
    </div>
  );
}

export default App;
