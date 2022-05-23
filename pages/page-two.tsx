import {Page} from "./_app";
import Head from "next/head";

const PageTwo: Page = () => {
  return (
      <>
        <Head>
          <title>This should override the title property</title>
        </Head>
        Test routing with custom server
      </>
  )
}

PageTwo.title = 'The second page.';

export default PageTwo;