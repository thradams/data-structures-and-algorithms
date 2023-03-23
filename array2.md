/*
  *  Dynamic array of copiable structs
  *  Copiable structs are structs where shallow is enoght
 */


#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>


struct book {
    char title[10];
};



struct books {
    struct book* data;
        int size;
        int capacity;
};

int books_reserve(struct books* p, int n)
{
        if (n > p->capacity) {

            const size_t new_size_bytes = (size_t)n * sizeof(p->data[0]);
            void* pnew = realloc(p->data, new_size_bytes);
            if (pnew == NULL) return ENOMEM;

            p->data = pnew;
            p->capacity = n;
        }

        return 0;
}



int books_push_back(struct books* p, const struct book* book)
{
        if (p->size == INT_MAX) {
            return EOVERFLOW;
        }

        if (p->size + 1 > p->capacity) {

            unsigned long long new_capacity = p->capacity + p->capacity / 2;


            if (new_capacity < p->size + 1) {
                new_capacity = p->size + 1;
            }
            else if (new_capacity > INT_MAX) {
               new_capacity = INT_MAX;
            }

       int error = books_reserve(p, (int)new_capacity);
            if (error != 0) {
                return error;
            }
        }

        p->data[p->size] = *book; /*COPIED*/

       /*
         after move (on success) the object book cannot be used 
         anymore. But we can still call destroy on it (with no effect)
         just for state simplification.
       */

        p->size++;

        return 0;
}

void books_destroy(struct books* books)
{

    free(books->data);
}


int main()
{
   struct books books = { 0 };

   struct book book = { .title ="book1" };
   books_push_back(&books, &book/*COPIED*/);
   books_destroy(&books);
}
