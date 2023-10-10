import { Button } from 'react-bootstrap';

export default function Search() {

  const url = import.meta.env.VITE_DNS_NAME + '8080/api/auth/Microsoft?token=' + localStorage.getItem('token');

    const MicrosoftConnection = () => {
        window.location.href = url;
      }

    return (
      <>
        <div className="w-screen">
          <div className="flex justify-center items-center">
            <h1 style={{ fontFamily: 'merriweather' }} className="text-[30px] text-black font-bold mt-[80px]">Explore</h1>
          </div>
          <div className="form-control mb-10 mt-5">
            <div className="flex justify-center items-center input-group">
              <input type="text" placeholder="Search…" className="input white-bg" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
            <Button style={{ fontFamily: 'merriweather' }} className="text-[30px] text-black font-bold mt-[80px]" onClick={MicrosoftConnection}>MICROCRO(Oh le bouton de zinzin)</Button>
            <div className="navbar-end"></div>

          </div>
        </div>
      </>
    );
  }
