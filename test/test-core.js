import test from 'ava';
import axillo from '../src';

const baseURL = 'test/api/url';

test('Should return type function', t => {
  t.is(typeof(axillo), 'function');
});


test('Should throw error baseURL', t => {
  const error = t.throws(() => {
    axillo();
  }, {instanceOf: Error});

  t.is(error.message, 'must be parameter `baseURL` must be defined');
});

test('Should return simple default parametrs and method', t => {
  t.snapshot(axillo({baseURL}));
});

test('Should return result null, loading false', t => {
  const { 
    result,
    loading
  } = axillo({baseURL});

  t.is(result.value, null);
  t.false(loading.value);
});
