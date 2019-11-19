const variables = {
  development: {

  },
  production: {

  }
};

const getEnvVariables = () => {
  let res: any;
  if(__DEV__){
    res = variables.development;
  } else {
    res = variables.production;
  }

  return res;
}

export default getEnvVariables;