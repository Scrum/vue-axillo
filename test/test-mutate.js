import test from 'ava';
import axillo from '../src';

const baseURL = 'https://jsonplaceholder.typicode.com/users/';

test.cb('mutate and default method post', t => {
  const { 
    mutate,
    onDone
  } = axillo({baseURL});

  mutate();

  onDone(response => {
    t.is(response.status, 201);
    t.end();
  })
});

test.cb('mutate and method delete', t => {
  const { 
    mutate,
    onDone
  } = axillo({
    baseURL,
    method: 'delete'
  });

  mutate({
    id: 1
  });

  onDone(response => {
    t.is(response.status, 200);
    t.end();
  })
});
