import Heder from './component/heder.jsx';
import Footer from './component/footer.jsx';

import elernig from './assets/elernig.jpg';
import './mainpage.css';

export default function MainPage() {
    return (
        <>
        <Heder />
           <div className="mainpagestyle">
            <br />
             <h2>Bharat’s Trusted & Affordable Educational Platform</h2>
             <p>Unlock your potential by signing up with <b>Zenya</b>-The most affordable learning solution</p>
             <p><b>Become lifelong learners with India's best teachers,<br />
             engaging video lessons and personalised learning journeys</b></p>
             <div className="edudev">
                <div className="edu1dev">
                    <div>
                    ✅ Interactive Courses
                    </div>
                    <div>
                    ✅ Expert Mentors
                    </div>
                    <div>
                    ✅ Learn Anytime, Anywhere
                    </div>
                    <div>
                    ✅ Certification on Completion
                    </div>
                </div>
                <div className="edu2dev">
                    <img src={elernig} alt="edudev" />
                </div>
             </div>
           </div>
        <Footer />   
        </>
    );
}