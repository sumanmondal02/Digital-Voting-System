package com.example.evm.model;

import jakarta.persistence.*;

@Entity
@Table(name = "votes",
       uniqueConstraints = {@UniqueConstraint(columnNames = {"voter_id", "election_id"})} )
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "voter_id", nullable = false)
    private String voterId;

    @Column(name = "election_id", nullable = false)
    private Long electionId;

    @Column(name = "candidate_id", nullable = false)
    private String candidateId;

    public Vote() {}

    public Vote(String voterId, Long electionId, String candidateId) {
        this.voterId = voterId;
        this.electionId = electionId;
        this.candidateId = candidateId;
    }

    // Getters and setters...

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getVoterId() { return voterId; }
    public void setVoterId(String voterId) { this.voterId = voterId; }

    public Long getElectionId() { return electionId; }
    public void setElectionId(Long electionId) { this.electionId = electionId; }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }
}
