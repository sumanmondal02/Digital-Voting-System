package com.example.evm.controller;

import com.example.evm.model.Vote;
import com.example.evm.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private VoteRepository voteRepository;

    // Submit a vote
    @PostMapping
    public ResponseEntity<String> submitVote(@RequestBody Vote vote) {
        // Check if voter already voted in this election
        if (voteRepository.existsByVoterIdAndElectionId(vote.getVoterId(), vote.getElectionId())) {
            return ResponseEntity.badRequest().body("Voter has already voted in this election.");
        }
        voteRepository.save(vote);
        return ResponseEntity.ok("Vote recorded successfully.");
    }

    // Get votes count by candidate for an election
    @GetMapping("/results/{electionId}")
    public ResponseEntity<Map<String, Long>> getResults(@PathVariable Long electionId) {
        List<Vote> votes = voteRepository.findByElectionId(electionId);
        Map<String, Long> result = votes.stream()
                .collect(Collectors.groupingBy(Vote::getCandidateId, Collectors.counting()));
        return ResponseEntity.ok(result);
    }
}
