package com.example.evm.repository;

import com.example.evm.model.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
    // You can add custom queries if needed later
}
