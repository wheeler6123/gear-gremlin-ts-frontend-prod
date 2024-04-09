import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import gearLayout from "../assets/gear-layout.jpg";
import camping from "../assets/camping.jpg";
import checklist from "../assets/checklist.jpg";
import riverFishing from "../assets/river-fishing.jpg"

const HomePage = () => {
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const [expandedCardIndex, setExpandedCardIndex] = useState<number[]>([]);
    const [email, setEmail] = useState('');
    const { trackPageView, trackEvent, enableLinkTracking } = useMatomo()

    enableLinkTracking();

    // Track page view
    useEffect(() => {
        trackPageView()
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Track click on button
        trackEvent({ category: 'homepage-register', action: 'click-event' })
        // Redirect the user to the signup page with the email prefilled
        navigate(`/signup?email=${email}`);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleCardClick = (index: number): void => {
        // Track click on button
        trackEvent({ category: 'homepage-cards', action: 'click-event' })
        const updatedIndexes = [...expandedCardIndex]; // Create a copy of the expandedCardIndex array
        const indexPosition = updatedIndexes.indexOf(index); // Check if the index is already in the array

        if (indexPosition !== -1) {
            updatedIndexes.splice(indexPosition, 1); // Remove the index from the array if it exists
        } else {
            updatedIndexes.push(index); // Add the index to the array if it doesn't exist
        }

        setExpandedCardIndex(updatedIndexes); // Update the expandedCardIndex state with the updated array
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <Helmet>
                <meta name="description" content="Don't forget to pack anything on your next outdoor adventure! Enter your gear inventory into the Gear Gremlin database, then create custom packing lists for any trip you want! Pack lists can be saved for future use and even exported to use as  a packing checklist!"/>
            </Helmet>
            <div className={showHeader ? 'header' : 'header-hidden'}>
                <Header />
            </div>
            <div className="home-page">
                <div className="hero">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Welcome to Gear Gremlin!
                        </h1>
                        <p className="hero-subtitle">
                            Your <span>ultimate</span> outdoor adventure gear organizer! 
                            <br />
                            Input and track all of your gear in one convenient place!
                            <br />
                            Plan for your next adventure with ease, adding the gear you wish to take based on trip duration, weather, and more!
                            <br />
                            Never forget your gear again!
                        </p>
                    </div>
                    <div className="hero-cta">
                        <h3>Register now for free</h3>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label htmlFor="cta-email"></label>
                            <input 
                                type="email" 
                                id="cta-email" 
                                placeholder="Enter your email address to get started..." 
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <button className='button' type="submit">Register Now</button>
                        </form>
                        <br />
                        {/* <p className="mb-0 text-muted">
                            Or, register and login with your Google account!{' '}
                            <a href={getGoogleOAuthUrl()} className="google-login-link">Login with Google</a>
                        </p> */}
                        <p>
                            Already have an account?{' '}
                            <a className="text-uppercase" href="/signin">Login Here</a>
                        </p>
                    </div>
                </div>
                <div className="features">
                    <h2>Features</h2>
                    {/* feature 1 */}
                    <div className="feature">
                        <div className="feature-text">
                            <div className="feature-title">
                                Catalog all of your gear in one spot
                            </div>
                            <div className="feature-subtitle">
                                With Gear Gremlin, you can forget about the spreadsheets, notebooks, and sticky notes. Keep track of all of your gear in one convenient location.
                            </div>
                        </div>
                        <div className="feature-image">
                            <img src={gearLayout} alt="photo of outdoor gear laid out viewed from above" />
                        </div>
                    </div>
                    {/* feature 2 */}
                    <div className="feature img-left">
                        <div className="feature-text right">
                            <div className="feature-title">
                                Plan your trips with ease
                            </div>
                            <div className="feature-subtitle">
                                Conveniently pack a bag for your next adventure. Gear Gremlin will track the overall weight of your pack as you build it, and trips can be saved for future use.
                            </div>
                        </div>
                        <div className="feature-image left">
                            <img src={camping} alt="view from inside tent looking out at mountains" />
                        </div>
                    </div>
                    {/* feature 3 */}
                    <div className="feature">
                        <div className="feature-text">
                            <div className="feature-title">
                                Export your trip to PDF for sharing and packing
                            </div>
                            <div className="feature-subtitle">
                                Ready to go? Quickly and easily export your packing list as a PDF file. You can then share your packing list with trip buddies or print it out for use as a physical checklist while packing your gear.
                            </div>
                        </div>
                        <div className="feature-image">
                            <img src={checklist} alt="photo of someone's hand checking off items on a checklist" />
                        </div>
                    </div>
                    {/* feature 4 */}
                    <div className="feature img-left">
                        <div className="feature-text right">
                            <div className="feature-title">
                            Easily plan future trips using custom tags and condition fields
                            </div>
                            <div className="feature-subtitle">
                                Add custom category and condition tags to your gear to more easily sort through it when planning a trip. You can pull "fishing" and "rain" gear for planning a rainy trout adventure, or "backpacking" and "snow" for a winter camping expedition away from the crowds.
                            </div>
                        </div>
                            <div className="feature-image">
                                <img src={riverFishing} alt="photo of a man fly-fishing at the edge of a river" />
                            </div>
                    </div>
                </div>
                <div className="faq">
                    <h2 className='faq-header'>Frequently Asked Questions</h2>
                    <div className='faq-card'> {/* index 0 */ }
                    <div className={`expandable-card ${expandedCardIndex.includes(0) ? 'expanded' : ''}`} onClick={() => handleCardClick(0)}>
                            <h3>What is Gear Gremlin?</h3>
                            <span>+</span>
                        </div>
                        {expandedCardIndex.includes(0) && (
                            <p className='faq-answer'>
                                Gear Gremlin is an application that allows you to keep track of all of your outdoor adventure gear in one convenient location. Create your gear inventory, and then add gear to your pack for your next adventure. Gear Gremlin will track the overall weight of your pack as you build it, eliminating the guesswork or need to weigh and repack your gear.
                            </p>
                        )}
                    </div>
                    <div className="faq-card"> {/* index 1 */ }
                        <div className={`expandable-card odd ${expandedCardIndex.includes(1) ? 'expanded' : ''}`} onClick={() => handleCardClick(1)}>
                        <h3>What does it cost?</h3>
                        <span>+</span>
                        </div>
                        {expandedCardIndex.includes(1) && (
                            <p className='faq-answer'>
                                Gear Gremlin is completely free to use. It was built by outdoor enthusiasts for their own personal use, and we decided to share it with the world after we found it so helpful. We hope you enjoy it!
                            </p>
                        )}
                    </div>
                    <div className="faq-card"> {/* index 2 */ }
                        <div className={`expandable-card ${expandedCardIndex.includes(2) ? 'expanded' : ''}`} onClick={() => handleCardClick(2)}>
                            <h3>Is it safe and secure?</h3>
                            <span>+</span>
                        </div>
                        {expandedCardIndex.includes(2) && (
                            <p className='faq-answer'>
                                Absolutely! Gear Gremlin uses a secure HTTPS connection to encrypt all data sent between the client and the server. All user data is stored in a secure database, and passwords hashed and salted to ensure your data is safe.
                            </p>
                        )}
                    </div>
                    <div className="faq-card"> {/* index 3 */ }
                        <div className={`expandable-card odd ${expandedCardIndex.includes(3) ? 'expanded' : ''}`} onClick={() => handleCardClick(3)}>
                            <h3>How do I get started?</h3>
                            <span>+</span>
                        </div>
                        {expandedCardIndex.includes(3) && (
                            <p className='faq-answer'>
                                To get started, you will need to register an account so that you can save your gear inventory and pack lists. Once you have registered, you can begin adding gear to your inventory and creating pack lists for your next adventure!
                            </p>
                        )}
                    </div>
                    <div className="faq-card"> {/* index 4 */ }
                        <div className={`expandable-card ${expandedCardIndex.includes(4) ? 'expanded' : ''}`} onClick={() => handleCardClick(4)}>
                            <h3>Can I save trip info to reuse for future adventures?</h3>
                            <span>+</span>
                        </div>
                        {expandedCardIndex.includes(4) && (
                            <p className='faq-answer'>
                                Of course! That's the point of Gear Gremlin, to streamline the packing process for your next adventure. Once you have created a pack list for a trip, you can save it for future use. We recommend using a name that will mean something to you in the future, such as "5-Day Summer Backpacking Trip", "3-Day Spring Truck Camping Fishing Trip" or "10-Day Winter Elk Hunting Trip". You get the idea!
                            </p>
                        )}
                    </div>
                    <div className="faq-card"> {/* index 5 */ }
                        <div className={`expandable-card odd ${expandedCardIndex.includes(5) ? 'expanded' : ''}`} onClick={() => handleCardClick(5)}>
                            <h3>Can I download the packing list? I want to print it out to use as a physical checklist while packing</h3>
                            <span>+</span>
                        </div>
                        {expandedCardIndex.includes(5) && (
                            <p className='faq-answer'>
                                Yup! You can download your packing list as a PDF file to print out and use as a physical checklist while packing. Just click the "Download Packing List" button on the pack list page.
                            </p>
                        )}
                    </div>
                    <div className="faq-card"> {/* index 6 */}
                        <div className={`expandable-card ${expandedCardIndex.includes(6) ? 'expanded' : ''}`} onClick={() => handleCardClick(6)}>
                            <h3>Is it possible to take a look without creating an account first?</h3>
                            <span>+</span>
                        </div>
                        {expandedCardIndex.includes(6) && (
                            <p className='faq-answer'>
                                Yes! A demo account has been setup with some sample data for you to explore. You can view the gear inventory, pack lists, and trip information. However, you will not be able to save any changes or create new data without creating an account. To check out the demo account, login with email "demo@demo.com" and password "DemoPass$1"
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;