// import { useEffect, useState } from 'react';
// import NewsListAPI from '../API/NewsListPageAPI';



// const NewsPage = () => {

//   const [posts, setPosts] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [postsPerPage] = useState(10);
//   const fetchPosts = async (page) => {
//     await fetch(NewsListAPI.getNewsPageAPI(page, 10))
//     .then(res => {

//       const data = res.data;
//       setPosts(data.data);
//       return data;
//     })
//   }
  
//   useEffect(() => {
//     // setLoading(true);

    

//     fetchPosts(1)
//   }, [])