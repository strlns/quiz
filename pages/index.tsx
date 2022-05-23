import DefaultLayout from "../layouts/default";
import {PageWithLayout} from "./_app";

const Home: PageWithLayout = () => {
  return (
      <h1>Hello World</h1>
  )
}

Home.layout = DefaultLayout;

export default Home
