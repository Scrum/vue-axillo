import test from 'ava';
import axillo from '../src';

const baseURL = 'https://jsonplaceholder.typicode.com/users/';

test('query', async t => {
  const { 
    query,
    result
  } = axillo({baseURL});

  await query();

  t.is(result.value.data.length, 10);
});

test('query with params', async t => {
  const { 
    query,
    result
  } = axillo({baseURL});

  await query({
    id: 1
  });

  t.is(result.value.data.name, 'Leanne Graham');
});