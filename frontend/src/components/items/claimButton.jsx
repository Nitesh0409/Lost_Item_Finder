import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import {useToaster} from "../ui/Toaster";

const ClaimButton = ({ isOwner, itemId, itemType, authorId }) => {
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [totalClaimants, setTotalClaimants] = useState(0);
  const [claimedByCurrentUser, setClaimedByCurrentUser] = useState(false);
  const navigate = useNavigate();
  const toast = useToaster();


  useEffect(() => {
    if (!itemId || !itemType) return;

    const checkClaims = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/claim/hasAnyClaim?itemId=${itemId}&itemType=${itemType}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to check claims");

        const data = await response.json();
        setClaimed(data.hasClaims);
        setTotalClaimants(data.totalClaimants || 0);
        setClaimedByCurrentUser(data.claimedByCurrentUser || false
  
        );
      } catch (error) {
        console.error("Error checking claims:", error);
        toast("Failed to check claim status", "error");
      }
    };

    checkClaims();
  }, [itemId, itemType]);

  const handleClaim = async () => {

    if (!itemId || !itemType || !authorId) {
      toast("Missing claim data", "error"); 
      return;
    }
  
    try {
      // setLoading(true);
      if (claimedByCurrentUser) {
        toast("You have already claimed this item", "info");
        return;
      }
  
      const confirmMessage = claimed
        ? "already claimed item. Do you still want to claim it?"
        : "Are you sure you want to claim this item?";
  
      const userConfirmed = window.confirm(confirmMessage);
      if (!userConfirmed) return;

      navigate(`/report-claim?itemId=${itemId}&itemType=${itemType}&authorId=${authorId}`);
    }
    catch (err) {
      console.log(err);
      toast("Something went wrong while claiming", "error");
    }
  };
  

  if (isOwner) return null;


  return (
    <button
      className="lf-btn lf-btn-cyan lf-w-full"
      onClick={handleClaim}
      // disabled={loading || claimedByCurrentUser}
    >
      {claimedByCurrentUser
        ? `claimed by (${totalClaimants}) including you`
        : claimed
        ? `Claimed by ${totalClaimants} user${totalClaimants > 1 ? "s" : ""}`
        : loading
        ? "Claiming..."
        : "Claim This Item"}
    </button>
  );
};

export default ClaimButton;
