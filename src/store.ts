class Store {
  private store: { [key: string]: any };

  constructor() {
    this.store = {};
  }

  public setData(key: string, value: any) {
    this.store[key] = value;
  }

  public getData(key: string) {
    return this.store[key];
  }
}

const store = new Store();

export default function createStore() {
  if (process.browser) {
    return store;
  } else {
    return new Store();
  }
}
