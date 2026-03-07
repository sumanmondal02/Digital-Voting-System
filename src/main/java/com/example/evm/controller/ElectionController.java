package com.example.evm.controller;

import com.example.evm.model.Election;
import com.example.evm.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {

    @Autowired
    private ElectionRepository electionRepository;

    // Get all elections
    @GetMapping
    public List<Election> getAllElections() {
        return electionRepository.findAll();
    }

    // Get election by id
    @GetMapping("/{id}")
    public ResponseEntity<Election> getElectionById(@PathVariable Long id) {
        Optional<Election> election = electionRepository.findById(id);
        if (election.isPresent()) {
            return ResponseEntity.ok(election.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create new election
    @PostMapping
    public Election createElection(@RequestBody Election election) {
        // By default new election is inactive
        election.setActive(false);
        return electionRepository.save(election);
    }

    // Update election (e.g., activate or close)
    @PutMapping("/{id}")
    public ResponseEntity<Election> updateElection(@PathVariable Long id, @RequestBody Election electionDetails) {
        Optional<Election> electionOptional = electionRepository.findById(id);
        if (electionOptional.isPresent()) {
            Election election = electionOptional.get();
            election.setName(electionDetails.getName());
            election.setStartDate(electionDetails.getStartDate());
            election.setEndDate(electionDetails.getEndDate());
            election.setActive(electionDetails.isActive());
            Election updatedElection = electionRepository.save(election);
            return ResponseEntity.ok(updatedElection);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete election by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteElection(@PathVariable Long id) {
        if (electionRepository.existsById(id)) {
            electionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
