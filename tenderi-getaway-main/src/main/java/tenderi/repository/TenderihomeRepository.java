package tenderi.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tenderi.domain.Tenderihome;

/**
 * Spring Data SQL reactive repository for the Tenderihome entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TenderihomeRepository extends R2dbcRepository<Tenderihome, Long>, TenderihomeRepositoryInternal {
    // just to avoid having unambigous methods
    @Override
    Flux<Tenderihome> findAll();

    @Override
    Mono<Tenderihome> findById(Long id);

    @Override
    <S extends Tenderihome> Mono<S> save(S entity);
}

interface TenderihomeRepositoryInternal {
    <S extends Tenderihome> Mono<S> insert(S entity);
    <S extends Tenderihome> Mono<S> save(S entity);
    Mono<Integer> update(Tenderihome entity);

    Flux<Tenderihome> findAll();
    Mono<Tenderihome> findById(Long id);
    Flux<Tenderihome> findAllBy(Pageable pageable);
    Flux<Tenderihome> findAllBy(Pageable pageable, Criteria criteria);
}
