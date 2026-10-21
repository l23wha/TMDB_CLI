

const args=process.argv.slice(2);

let movieType='popular';



 for(let i=0;i<args.length;i++){
     if(args[i]==='--type' && args[i+1]){
         movieType=args[i+1];
         break;
     }
 }


 //End point

 const endpoints={
     popular: 'https://api.themoviedb.org/3/movie/popular',
  playing: 'https://api.themoviedb.org/3/movie/now_playing',
  top: 'https://api.themoviedb.org/3/movie/top_rated',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming'
 }

 const url=endpoints[movieType] || endpoints.popular;

 async function getMovies(){
     const options={
           method:'GET',
           headers:{
             accept:"application/json",
             Authorization:`Bearer ${process.env.TMDB_ACCESS_TOKEN}`
           }
     }

     try{
         const response=await fetch(url,options);

         if(!response.ok){
             throw new Error(`Http error! Status: ${response.status}`);

         }
         const data=await response.json();

           console.log(`\n--- Movies Category: ${movieType.toUpperCase()} ---\n`);
    data.results.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} | Release: ${movie.release_date} | Rating:  ${movie.vote_average}`);
    });
     }catch(err){
         console.error("Error fetching movies:", err.message);
     }
 }

 getMovies();