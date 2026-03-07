package com.example.evm.model;

import jakarta.persistence.*;
import java.util.Set;
import java.time.LocalDateTime;
import java.util.HashSet;

@Entity
@Table(name = "elections")
public class Election {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean active;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "election_candidate_ids", joinColumns = @JoinColumn(name = "election_id"))
    @Column(name = "candidate_id")
    private Set<String> candidateIds = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "election_voter_ids", joinColumns = @JoinColumn(name = "election_id"))
    @Column(name = "voter_id")
    private Set<String> voterIds = new HashSet<>();

    // Getters and setters for all fields including id

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public LocalDateTime getStartDate() {
        return startDate;
    }


    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }


    public LocalDateTime getEndDate() {
        return endDate;
    }


    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }


    public boolean isActive() {
        return active;
    }


    public void setActive(boolean active) {
        this.active = active;
    }


    public Set<String> getCandidateIds() {
        return candidateIds;
    }


    public void setCandidateIds(Set<String> candidateIds) {
        this.candidateIds = candidateIds;
    }


    public Set<String> getVoterIds() {
        return voterIds;
    }


    public void setVoterIds(Set<String> voterIds) {
        this.voterIds = voterIds;
    }
}
