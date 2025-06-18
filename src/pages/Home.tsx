import { MetRicsChartTemplate } from "../component/chart";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white my-8 w-full flex content-center justify-center">
        System Monitoring
      </h1>
      <MetRicsChartTemplate />
    </>
  );
};

export default Home;
