import DefaultLayout from "../layouts/default";
import {Page} from "./_app";

const Home: Page = () => {
  return (
      <h1>Hello World</h1>
  )
}

Home.layout = DefaultLayout;

export default Home
