const api = {
  get(url) {
    return new Promise((res) => {
      fetch(url).then(response => response.json()).then(data => {
        return res(data);
      })
    })
  }
};

export default api;