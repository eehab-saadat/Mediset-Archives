import PrimarySearchAppBar from "../components/SearchBar";
import CardContainer from "../components/CardContainer";

export default function HomePage() {
    return (
        <div>
            <div>
            <PrimarySearchAppBar />
           </div>
           <br>
           </br>
            <div>
                <h1>Top Datasets</h1>
                <CardContainer limit={5} ordered />
            </div>
            <div>
                <h1>Recently Added Datasets</h1>
                <CardContainer limit={5} />
            </div>
        </div>
    );
}
