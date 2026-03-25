import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";

actor {
  type ProjectType = {
    #residential;
    #hospitality;
    #commercial;
    #institutional;
    #other;
  };

  public type Inquiry = {
    name : Text;
    email : Text;
    projectType : ProjectType;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compareByTime(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry2.timestamp, inquiry1.timestamp);
    };
  };

  let inquiries = Map.empty<Time.Time, Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, projectType : ProjectType, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      projectType;
      message;
      timestamp = Time.now();
    };
    inquiries.add(inquiry.timestamp, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort(Inquiry.compareByTime);
  };
};
