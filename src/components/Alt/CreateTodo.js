import React from 'react';
import Button from './Button';

const CreateTodo = ({
  coTitle,
  orgaLocat,
  onNameChange,
  onDescriptionChange,
  onCreate,
}) => (
  <div style={styles.container}>
    <input
      onChange={(event) => onNameChange('coTitle', event.target.value)}
      style={styles.input}
      value={coTitle}
      placeholder="coTitle"
    />
    <input
      onChange={(event) =>
        onDescriptionChange('orgaLocat', event.target.value)
      }
      style={styles.input}
      value={orgaLocat}
      placeholder="orgaLocat"
    />
    <Button onClick={onCreate}>Create Todo</Button>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#023047',
    marginTop: 10,
    padding: 10,
    height: 150,
  },
  input: {
    border: 'none',
    backgroundColor: '#e5e5e5',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
};

export default CreateTodo;
