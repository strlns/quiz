import { Page } from "../next-types/Page";
import PublicPage from "../layouts/PublicPage";

const Home: Page = () => {
  return <h1>Hello World</h1>;
};

Home.layout = PublicPage;

export default Home;
