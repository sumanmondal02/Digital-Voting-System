package com.example.evm.repository;

import com.example.evm.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    List<Vote> findByElectionId(Long electionId);

    boolean existsByVoterIdAndElectionId(String voterId, Long electionId);
}
