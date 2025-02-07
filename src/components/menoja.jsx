import axios from 'axios';

let palvelin = 'http://localhost:8080/';

export const getMenot = async () => {
  try {
    const response = await axios.get(palvelin + 'menot');
    return (response);
  } catch (error) {
    return ({ status: 500, message: 'Haku ei onnistunut: ' + error.message });
  }
}

export const addMeno = async (meno) => {
  try {
    const response = await axios.post(palvelin + 'menot/add', meno, {
      headers: {'Content-Type': 'x-www-form-urlencoded' }
    });
    

    return (response);
  } catch (error) {
    return ({ status: 500, message: 'Lisäys ei onnistunut: ' + error.message });
  }
}

export const updateMeno = async (meno) => {
  try {
    const response = await axios.put(palvelin + 'menot/update', meno, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}});
    //const response = await axios.put(palvelin + 'menot/update', meno, {headers: { 'Content-Type': 'application/json'}});
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Muokkaus ei onnistunut: ' + error.message });
  }
}

export const deleteMeno = async (id) => {
  try {
    const response = await axios.delete(palvelin + 'menot/delete/' + id);
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Poisto ei onnistunut: ' + error.message });
  }
}

