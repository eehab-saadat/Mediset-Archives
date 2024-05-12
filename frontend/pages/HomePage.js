import PrimarySearchAppBar from "../components/SearchBar";
import CardContainer from "../components/CardContainer";

export default function HomePage() {
    return (
        <div>
            <PrimarySearchAppBar />
        <br/><br/>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Top Datasets</h2>
                <CardContainer limit={3} ordered style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
                <h2>Datasets for You</h2>
                <CardContainer limit={3} contains={''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
                <h2>Others</h2>
                <CardContainer limit={10} contains={''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
            </div>
        </div>
    );
}
