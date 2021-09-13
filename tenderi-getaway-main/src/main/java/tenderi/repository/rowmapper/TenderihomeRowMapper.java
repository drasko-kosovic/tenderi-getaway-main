package tenderi.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;
import tenderi.domain.Tenderihome;
import tenderi.service.ColumnConverter;

/**
 * Converter between {@link Row} to {@link Tenderihome}, with proper type conversions.
 */
@Service
public class TenderihomeRowMapper implements BiFunction<Row, String, Tenderihome> {

    private final ColumnConverter converter;

    public TenderihomeRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Tenderihome} stored in the database.
     */
    @Override
    public Tenderihome apply(Row row, String prefix) {
        Tenderihome entity = new Tenderihome();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        return entity;
    }
}
