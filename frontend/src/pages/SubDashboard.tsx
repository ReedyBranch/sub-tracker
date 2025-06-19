import NavBar from "../components/NavBar";

function SubDashboard() {
  // Fetches all subscriptions from backend
  // Include UI elements to add, edit, or delete subscriptions
  // Be the hub of the application

  // SubscriptionList --> display list of subs - separate file for component as are the rest of these
  // SubscriptionItem --> display a sub
  // SubscriptionForm --> manage sub and create a sub

  return (
    <>
      <NavBar />
      {/* Page Container */}
      <div className="dash-container">
        <h1 className="dash-title">Your Subscriptions</h1>

        {/* Action Button */}
        <div className="dash-actions">
          <button className="add-sub">+ Add Subscription Here</button>
        </div>

        {/* Subscription Form */}
        {/* Conditionally render this when user wants to add/edit */}
        {/* <SubForm /> */}

        {/* Subscriptions List */}
        <div className="sub-list">
          {/* Here is for the subscription list we will have later */}
          {/* <SubList /> */}
        </div>
      </div>
    </>
  );
}

export default SubDashboard;
