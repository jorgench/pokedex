const api = {
  get(url) {
    return new Promise((res, rej) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          return res(data);
        })
        .catch(() => {
          rej();
        });
    });
  },
};

export default api;
